'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  useEffect(() => {
    if (isSubmittedSuccessfully && successMessageRef.current) {
      successMessageRef.current.focus();
    }
  }, [isSubmittedSuccessfully]);

  useEffect(() => {
    if (isError && errorMessageRef.current) {
      errorMessageRef.current.focus();
    }
  }, [isError]);

  const sendEmail = (data) => {
    console.log("Sending email with data:", data);
    const apiEndpoint = '/api/email';

    axios.post(apiEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("Email sent successfully:", response.data);
      setIsSubmittedSuccessfully(true);
      setIsError(false);
      setIsSubmitting(false);
      reset();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      setIsSubmittedSuccessfully(false);
      setIsError(true);
      setIsSubmitting(false);
    });
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    sendEmail(data);
  };

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
              {isSubmittedSuccessfully && (
                <div role="alert" className="successMessage" tabIndex="-1" ref={successMessageRef}>
                  Skjemaet ble sendt inn vellykket! Vi vil kontakte deg snart.
                </div>
              )}
              {isError && (
                <div role="alert" className="errorMessageAlert" tabIndex="-1" ref={errorMessageRef}>
                  Kunne ikke sende e-post. Kontakt oss på info@helpinghands.no.
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="name">Navn</label>
                  <input type="text" className={`form-control ${errors.name ? 'errorInput' : ''}`} id="name" autoComplete="name" placeholder="Navn Navnesen" 
                  {...register('name')} />
                  {errors.name && <p className="errorMessage">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-post adresse</label>
                  <input type="email" className={`form-control ${errors.email ? 'errorInput' : ''}`} id="email" autoComplete="email" aria-describedby="emailHelp" placeholder="dittnavn@epost.no" 
                  {...register('email')} />
                  <small id="emailHelp" className="form-text text-muted">
                      Brukes kun til å sende oppdateringer om ditt fadderbarn eller annen relevant fadder informasjon.
                  </small>
                  {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="fadderbarn">Fadderbarn</label>
                  <select className={`form-control ${errors.fadderbarn ? 'errorInput' : ''}`} id="fadderbarn" {...register('fadderbarn')}>
                    <option value="">Velg fadderbarn</option>
                    <option value="vårt-forslag">La oss komme med et forslag</option>
                    <option value="Mary">Mary</option>
                    <option value="Abdala">Abdala</option>
                    <option value="Christopher">Christopher</option>
                    <option value="Salimu">Salimu</option>
                    <option value="Mahad">Mahad</option>
                    <option value="Ali">Ali</option>
                    <option value="Esther">Esther</option>
                    <option value="Yahaya">Yahaya</option>
                    <option value="Kelvin">Kelvin</option>
                    <option value="Nordin">Nordin</option>
                    <option value="Nijad">Nijad</option>
                    <option value="Sofia">Sofia</option>
                    <option value="Abdul">Abdul</option>
                    <option value="Bahati">Bahati</option>
                    <option value="Halima">Halima</option>
                    <option value="Joseph">Joseph</option>
                    <option value="Aiman">Aiman</option>
                    <option value="Ibrahim">Ibrahim</option>
                  </select>
                  {errors.fadderbarn && <p className="errorMessage">{errors.fadderbarn.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Beløp</label>
                  <input type="number" className={`form-control ${errors.amount ? 'errorInput' : ''}`} id="amount" placeholder="200" 
                  {...register('amount')} />
                  {errors.amount && <p className="errorMessage">{errors.amount.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Kommentar</label>
                  <textarea className="form-control" id="comment" rows="3" {...register('comment')} />
                </div>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="fasttrekk" aria-describedby='paymentHelp'
                    {...register('fasttrekk')} />
                    <label className="form-check-label" htmlFor="fasttrekk">Fast trekk</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="avtalegiro" aria-describedby='paymentHelp'
                    {...register('avtalegiro')} />
                    <label className="form-check-label" htmlFor="avtalegiro">AvtaleGiro</label>
                  </div>
                  <small id="paymentHelp" className="form-text text-muted help-text-avtale">
                    Ved valg av AvtaleGiro påløper et fakturagebyr på 39kr. Fast trekk settes opp i egen nettbank.
                  </small> 
                </div>
                <button type="submit" className="btn btn--form">
                  {isSubmitting ? 'Sender...' : 'Send'}
                </button>
              </form>
            </div>
            <div className="col-md-6">
              {/* Additional content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BliFadder;
