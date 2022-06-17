import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import { required } from "../../utils/validators";
import { getInputState } from "../../utils/getInputState";

//mui
import { Button, styled, TextField, FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import InputMask from "react-input-mask";

const Wrapper = styled("form")``;

export const OrderForm = ({ ...props }) => {
  const { register, handleSubmit, formState, control } = useForm();
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Оформление заявки
      </Typography>
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <TextField
          label="Имя"
          variant="outlined"
          {...register("name", {
            required: required(),
          })}
          {...getInputState(formState, "name")}
        />
      </FormControl>

      {/* <FormControl sx={{ width: "100%", mb: 2 }}>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputMask mask="+999999999999" value={value} onChange={onChange}>
              {(inputProps) => (
                <TextField
                  error={!!errors.phone?.message}
                  label="Phone"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  {...inputProps}
                />
              )}
            </InputMask>
          )}
        />
      </FormControl> */}
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange } }) => (
            <InputMask
              mask="+7 999 999 99 99"
              value={value}
              onChange={onChange}
              disabled={false}
            >
              <TextField
                label="Номер телефона"
                variant="outlined"
                {...getInputState(formState, "phoneNumber")}
              />
            </InputMask>
          )}
        ></Controller>
      </FormControl>
      {/* <FormControl sx={{ width: "100%", mb: 2 }}>
        <InputMask
          label="Номер телефона"
          variant="outlined"
          mask="+7\799 999 99 99"
          maskChar="-"
          {...register("phoneNumber", {
            required: required(),
          })}
          {...getInputState(formState, "phoneNumber")}
        >
          {() => <TextField label="Номер телефона" variant="outlined" />}
        </InputMask>
      </FormControl> */}
      {/* <FormControl sx={{ width: "100%", mb: 2 }}>
        <TextField
          label="Номер телефона"
          variant="outlined"
          {...register("phoneNumber", {
            required: required(),
          })}
          {...getInputState(formState, "phoneNumber")}
        >
          {() => <InputMask mask="+7\799 999 99 99" maskChar=" " />}
        </TextField>
      </FormControl> */}
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <TextField
          label="Эл. Почта"
          variant="outlined"
          type="email"
          {...register("email")}
          {...getInputState(formState, "email")}
        />
      </FormControl>
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <TextField
          label="Город"
          variant="outlined"
          {...register("city")}
          {...getInputState(formState, "city")}
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "30%", margin: "auto" }}
        >
          Отправить
        </Button>
      </FormControl>
    </Wrapper>
  );
};
