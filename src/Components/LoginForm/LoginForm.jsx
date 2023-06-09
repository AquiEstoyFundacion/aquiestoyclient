import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getBothRoles } from '../../Redux/Actions/viewActions';
import { useNavigate } from "react-router-dom"
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { styled } from '@mui/system';
import { loginSuccess } from '../../Redux/Actions/actions';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Requerido'),
  password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
});

const LoginForm = ({ handleMouseLeave }) => {
  const navigate = useNavigate()
  const redirectToPasswordRecovery = () => {
    handleMouseLeave();
    navigate('/password-recovery');
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  const { name, id, lastName, profilePhoto, birthdayDate, nationality, country, phone, profession, studies, gender, CityTimeZoneId } = user
  useEffect(() => {
    if (Object.entries(user).length) {
      dispatch(loginSuccess(user))
      if (name && lastName && profilePhoto && birthdayDate && nationality && country && phone && profession && studies && gender && CityTimeZoneId) {
        navigate(`/profile/${id}`)
      } else {
        navigate("/register")
      }
      handleMouseLeave()
    }
  }, [user])
  const submitHandler = async (values) => {
    const { email, password } = values;
    dispatch(getBothRoles(email, password))
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <Form>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{marginTop: "10px"}}>Iniciar sesión</Typography>

              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  type="email"

                  error={!!(formik.errors.email && formik.touched.email)}
                  helperText={<ErrorMessage name="email" />}

                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  type="password"

                  error={!!(formik.errors.password && formik.touched.password)}
                  helperText={<ErrorMessage name="password" />}

                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ cursor: 'pointer', color: 'primary.main' }}
                  onClick={redirectToPasswordRecovery}
                >
                  ¿Olvidaste tu contraseña?
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    color='primary'
                    variant="contained"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Iniciar sesión
                  </Button>
                  <Button onClick={() => handleMouseLeave()} variant='outlined'>Cancelar</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
