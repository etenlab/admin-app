import { gql } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

interface tableFields{
    [key: string]: string[]
}
interface rowFields{
    [key: string]: string
}

export interface RequestArgs {
    tableNames: string[],
    aggregateTable?: string,
    fields: tableFields,
    limit?: number,
    offset?: number,
    filterValue?: string,
    filterColumns?: string[],
    getRow?: boolean,
    getRowField?: rowFields,
    getRowValue?: string
};

export function buildQuery(request: RequestArgs){  
    var query = `{"query":{`;
    if(!request.getRow){
        if(request.aggregateTable){
            query+=`"${request.aggregateTable}_aggregate":{`
            if(request.filterValue!=="" && request.filterColumns!.length > 0){
                query+=`"__args":{"where":{"_or":[`
                request.filterColumns!.forEach((fc, index) => {
                    if(index > 0){
                        query+=`,`
                    }
                    query+=`{"${fc}":{"_ilike": "${request.filterValue}"}}`
                })
                query+=`]}},`
            }
            query+=`"aggregate":{"count":"true"}},`  
        }   
    }
    if(request.tableNames.length){
        request.tableNames.forEach((tableName, tblIndex) => {
            if(tblIndex > 0){
                query+=`,`
            }
            query+=`"${tableName}":{`
            if(request.getRow && request.getRowField![tableName]){
                query+=`"__args":{"where":{"${request.getRowField![tableName]}":{"_eq":"${request.getRowValue}"}}},`
            }
            else{
                query+=`"__args":{"limit":${request.limit},"offset":${request.offset},"where":{"_or":[`
                request.filterColumns!.forEach((fc, index) => {
                    if(index > 0){
                        query+=`,`
                    }
                    query+=`{"${fc}":{"_ilike":"${request.filterValue}"}}`
                })
                query+=`]}},`
            }
            if(request.fields[tableName].length){
                request.fields[tableName].forEach((column, index) => {
                    if(index > 0){
                        query+=`, `
                    }
                    query+=`"${column}":"true"`
                })
            }
        query+=`}`
        })
    }
    query+=`}}`
    let jsonObject = JSON.parse(query); 
    var gqlQuery = jsonToGraphQLQuery(jsonObject, { pretty: true })
    return gql`${gqlQuery}`
}