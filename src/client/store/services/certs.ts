import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Cert = {
    "ID": string,
    "TABLENAME": string,
    "PRIMARYKEY": string,
    "NAME": string,
    "DESCRIPTION": string,
    "PRICE": string,
    "SUMMA": string,
    "DISCOUNT": string,
    "IMAGEURL": string,
    "REC_SNO": string,
    "REC_NAME": string,
    "REC_SUM": string,
    "REC_QUANTITY": string,
    "REC_PAYMENT_METHOD": string,
    "REC_PAYMENT_OBJECT": string,
    "REC_TAX": string
}

export type CertsData = {
    "data": Cert[]
}

export type CertsParams = {
    "apikey": string,
    "methodname": "OSGetGoodList"
}

export const certsAPI = createApi({
    reducerPath: 'certsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sycret.ru/service/api/api',
    }),
    endpoints: (build) => ({
        fetchCerts: build.query<CertsData, CertsParams>({
            query: (params) => `?${new URLSearchParams(params)}`,
        }),
    })
});

export const { useFetchCertsQuery } = certsAPI;