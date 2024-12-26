import React, { useCallback, useEffect, useRef, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useNavigate } from "react-router";

function Form({sendParams, setSendParams, setPrevPath}: {sendParams: any, setSendParams: Function, setPrevPath: Function}) {

    console.log("Form");
    
    const cn = bem('Form');

    useEffect(() => {
        (document.getElementById('phone') as HTMLInputElement).value = '8 (___) ___-__-__';
    }, []);

    let navigate = useNavigate();

    const [ first, setFirst ] = useState(true);

    const [ nameWarn, setNameWarn ] = useState('ФИО должно быть заполнено!');
    const [ phone, setPhone ] = useState('');
    const [ phoneWarn, setPhoneWarn ] = useState('Телефон должен быть заполнен!');
    const [ emailWarn, setEmailWarn ] = useState('E-Mail должен быть заполнен!');

    return (
        <div className={cn()}>
            <div style={{display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.6)', paddingBottom: '20px'}}>
                <h1>Сертификат на {sendParams.price}</h1>
                <div className={cn('field')}>
                    <label htmlFor="name" style={{color: nameWarn && !first  ? 'red' : 'black'}}>ФИО</label>
                    <input id="name" style={{borderColor: nameWarn && !first ? 'red' : 'plum'}} onChange={e => {
                        if (!e.target.value) {
                            setNameWarn('ФИО должно быть заполнено!');
                        }
                        else {
                            setNameWarn('');
                        }
                    }} />
                </div>
                <div className={cn('warn')}>{!first ? nameWarn : ''}</div>
                <div className={cn('field')}>
                    <label htmlFor="phone" style={{color: phoneWarn && !first  ? 'red' : 'black'}}>Телефон</label>
                    <input id="phone" style={{borderColor: phoneWarn && !first ? 'red' : 'plum'}} onKeyUp={e => {
                        function formatNumber(number: string) {
                            return `8 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`;
                        }
                        const key = e.key;
                        const input = key.match(/\d/) && phone.length < 10 ? key : '';
                        let newPhone;
                        if (e.key === 'Backspace') {
                            newPhone = phone.slice(0, phone.length - 1);
                        } else {
                            newPhone = phone + input;
                        }
                        console.log(newPhone);
                        const input2 = newPhone + '_'.repeat(10 - newPhone.length);
                        const formattedNumber = formatNumber(input2);
                        (e.target as HTMLInputElement).value = formattedNumber;
                        if (newPhone.length !== 10) {
                            setPhoneWarn('Телефон должен быть заполнен!');
                        }
                        else {
                            setPhoneWarn('');
                        }
                        setPhone(newPhone);
                    }} />
                </div>
                <div className={cn('warn')}>{!first ? phoneWarn : ''}</div>
                <div className={cn('field')}>
                    <label htmlFor="msg">Сообщение</label>
                    <textarea id="msg" rows={3}></textarea>
                </div>
                <div className={cn('field')}>
                    <label htmlFor="email" style={{color: emailWarn && !first  ? 'red' : 'black'}}>E-Mail</label>
                    <input id="email" style={{borderColor: emailWarn && !first ? 'red' : 'plum'}} onChange={e => {
                        if (!e.target.value) {
                            setEmailWarn('E-Mail должен быть заполнен!');
                        }
                        else if (!e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z]{2,}$/)) {
                            setEmailWarn('Некорректный e-mail!');
                        }
                        else {
                            setEmailWarn('');
                        }
                    }} />
                </div>
                <div className={cn('warn')}>{!first ? emailWarn : ''}</div>
                <div className={cn('buttons')}>
                    <button onClick={e => navigate('/onlinesale')} style={{marginRight: '10px'}}>Назад</button>
                    <button onClick={e => {
                        setFirst(false);
                        if (!nameWarn && !phoneWarn && !emailWarn) {
                            setSendParams({
                                clientname: (document.getElementById('name') as HTMLInputElement).value,
                                phone: (document.getElementById('phone') as HTMLInputElement).value,
                                email: (document.getElementById('email') as HTMLInputElement).value,
                                msgtext: (document.getElementById('msg') as HTMLInputElement).value,
                            });
                            setPrevPath('/onlinesale/form'); 
                            navigate('/paid');
                        }
                    }}>Перейти к оплате</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Form);