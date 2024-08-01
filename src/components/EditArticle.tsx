import React, { FC, memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Article {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

type FormValues = {
  title: string;
  body: string;
};

export const EditArticle: FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${id}/update`)
      .then((response) => {
        const { title, body } = response.data;
        setValue("title", title);
        setValue("body", body);
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [id]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .put(`http://127.0.0.1:5000/${id}/update`, data)
      .then((response) => {
        console.log(response.data);
        reset();
        navigate("/articles");
      })
      .catch((error) => {
        console.error("There was an error creating the post!", error);
      });
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        編集画面
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="title" mb={4}>
          <FormLabel>タイトル</FormLabel>
          <Input type="text" {...register("title", { required: true })} />
        </FormControl>
        <FormControl id="body" mb={4}>
          <FormLabel>本文</FormLabel>
          <Textarea {...register("body", { required: true })} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          登録
        </Button>
      </form>
    </Box>
  );
});
