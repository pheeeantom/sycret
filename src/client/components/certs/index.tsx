import React, { useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { CertsData } from "../../store/services/certs";
import Spinner from "../spinner";
import { useNavigate } from "react-router";

function Certs({data, isLoading, setPrevPath, setSendParams}: {data: CertsData, isLoading: boolean, setPrevPath: Function,
    setSendParams: Function
}) {

    console.log("Certs");

    const cn = bem('Certs');

    const [ checkedId, setCheckedId ] = useState('');

    let navigate = useNavigate();

    return (
        <div className={cn()}>
            <div style={{display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.6)', paddingBottom: '20px'}}>
                <h1>Выберите сертификат</h1>
                <Spinner active={isLoading}>
                    {data?.data.map(cert => (
                        <div style={{textAlign: 'center'}}>
                            <div key={cert.ID} className={cn('element')}>
                                <input type="checkbox" id={cert.PRIMARYKEY} name="cert" checked={cert.PRIMARYKEY === checkedId} onChange={e => setCheckedId(e.target.id)}/>
                                <label htmlFor={cert.PRIMARYKEY}>{cert.NAME}</label>
                            </div>
                        </div>
                    ))}
                </Spinner>
                <div className={cn('sum')}>{"Цена: " + (data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.SUMMA ?? "0.00") + " р."}<button disabled={!checkedId} onClick={e => { setPrevPath('/onlinesale'); setSendParams({
                    id: data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.ID,
                    tablename: data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.TABLENAME,
                    primarykey: data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.PRIMARYKEY,
                    price: data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.PRICE,
                    summa: data?.data.find(cert => cert.PRIMARYKEY === checkedId)?.SUMMA,
                    paymenttypeid: 2,
                    usedelivery: 0,
                    isgift: 0,
                }); navigate('form'); }}>Купить</button></div>
            </div>
        </div>
    )
}

export default React.memo(Certs);