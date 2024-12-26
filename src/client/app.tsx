import React, { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useFetchCertsQuery } from './store/services/certs';
import Certs from './components/certs';
import PageLayout from './components/page-layout';
import Form from './components/form';

function App() {

    console.log("App");

    const { data, error, isLoading } = useFetchCertsQuery({
        'apikey': '011ba11bdcad4fa396660c2ec447ef14',
        'methodname': 'OSGetGoodList'
    });

    const [ prevPath, setPrevPath ] = useState('');

    const [ sendParams, setSendParams ] = useState({});
    
    const callbacks = {
        setSendParams: useCallback((params: Object) => {
            setSendParams({...sendParams, ...params});
        }, [sendParams, setSendParams]),
    }

    return (
        <Routes>
            <Route path={"/onlinesale"} element={
                <PageLayout>
                    <Certs data={data} isLoading={isLoading} setPrevPath={setPrevPath} setSendParams={callbacks.setSendParams} />
                </PageLayout>
            }/>
            <Route path={"/onlinesale/form"} element={
                prevPath === '/onlinesale' ? <Form sendParams={sendParams} setPrevPath={setPrevPath} setSendParams={callbacks.setSendParams} /> : <Navigate to={'/onlinesale'} />
            }/>
            <Route path={"/paid"} element={
                prevPath === '/onlinesale/form' ? 'Отправлено: ' + JSON.stringify(sendParams) : <Navigate to={'/onlinesale'} />
            }/>
        </Routes>
    );
}

export default React.memo(App);