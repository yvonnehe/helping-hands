'use client';

import React from 'react';
import NextHead from "../components/NextHead";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import { sendEmail } from '../utils/send-email';

const schema = yup.object({
  name: yup.string().required('Navn er påkrevd'),
  email: yup.string().email('Må være en gyldig e-postadresse').required('E-post er påkrevd'),
  fadderbarn: yup.string().required('Du må velge et fadderbarn'),
  amount: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .nullable()
    .positive('Beløpet må være positivt')
    .integer('Beløpet må være et heltall')
    .required('Beløp er påkrevd'),
  comment: yup.string(),
  fasttrekk: yup.boolean(),
  avtalegiro: yup.boolean(),
}).required();

const BliFadder = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
      sendEmail(data);
  }

//   const onSubmit = (data) => {
//     console.log(data);
//   };

  const sendEmail = (data) => {
    console.log("Sending email with data:", data);
    const apiEndpoint = '/api/email';

    console.log(data);
    axios.post(apiEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <>
      <NextHead />

      <div className="kontakt">
      <div className="container-fluid">
        <div className="row kontakt--padding">
          <div className="col-md-6">
            <h2>Bli fadder</h2>
            <h3 className="kontakt__h3">
              Dersom det er noe du lurer på, kan du gjerne ta kontakt med oss.
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Navn</label>
                    <input type="name" className={`form-control ${errors.name ? 'errorInput' : ''}`} id="name" placeholder="Navn Navnesen" 
                    {...register('name')}/>
                    {errors.name && <p className="errorMessage">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">E-post adresse</label>
                    <input type="email" className={`form-control ${errors.name ? 'errorInput' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="dittnavn@epost.no" 
                    {...register('email')}/>
                    <small id="emailHelp" className="form-text text-muted">
                        Brukes kun til å sende oppdateringer om ditt fadderbarn eller annen relevant fadder informasjon.
                    </small>
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="fadderbarn">Fadderbarn</label>
                    <select className={`form-control ${errors.name ? 'errorInput' : ''}`} id="fadderbarn" 
                    {...register('fadderbarn')}>
                        <option>Velg fadderbarn</option>
                        <option value="vårt-forslag">La oss komme med et forslag</option>
                        <option value="Zakayo">Zakayo</option>
                        <option value="Mohammed">Mohammed</option>
                        <option value="Rashid">Rashid</option>
                        <option value="Mary">Mary</option>
                        <option value="Abdala">Abdala</option>
                        <option value="Christopher">Christopher</option>
                        <option value="Salimu">Salimu</option>
                        <option value="Irene">Irene</option>
                        <option value="Yasir">Yasir</option>
                        <option value="Mahad">Mahad</option>
                        <option value="Karen">Karen</option>
                        <option value="Ana">Ana</option>
                        <option value="Ali">Ali</option>
                        <option value="Esther">Esther</option>
                        <option value="Nusrat">Nusrat</option>
                        <option value="Lillian">Lillian</option>
                        <option value="Yahaya">Yahaya</option>
                        <option value="Kelvin">Kelvin</option>
                        <option value="Iddi">Iddi</option>
                        <option value="Nordin">Nordin</option>
                        <option value="Elmaria">Elmaria</option>
                        <option value="Fatina">Fatina</option>
                        <option value="Maurin">Maurin</option>
                        <option value="Nijad">Nijad</option>
                        <option value="Ramadhan">Ramadhan</option>
                        <option value="Sofia">Sofia</option>
                        <option value="Abdul">Abdul</option>
                    </select>
                    {errors.fadderbarn && <p className="errorMessage">{errors.fadderbarn.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Beløp</label>
                    <input type="number" className={`form-control ${errors.name ? 'errorInput' : ''}`} id="amount" placeholder="200" 
                    {...register('amount')}/>
                    {errors.amount && <p className="errorMessage">{errors.amount.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Kommentar</label>
                    <textarea className="form-control" id="comment" rows="3" 
                    {...register('comment')}
                    />
                </div>

                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="fasttrekk" value="fasttrekk" aria-describedby="paymentHelp" 
                        {...register('fasttrekk')} />
                        <label className="form-check-label" htmlFor="fasttrekk">Fast trekk</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="avtalegiro" value="avtalegiro" aria-describedby="paymentHelp"
                        {...register('avtalegiro')} />
                        <label className="form-check-label" htmlFor="avtalegiro">AvtaleGiro</label>
                    </div>
                    <small id="paymentHelp" className="form-text text-muted help-text-avtale">
                    Ved valg av AvtaleGiro påløper et fakturagebyr på 39kr. Fast trekk settes opp i egen nettbank.
                    </small> 
                </div>

                <button className="btn btn--form">
                    Send
                </button>
            </form>
          </div>
          </div>
          <div className="col-md-6">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default BliFadder;

