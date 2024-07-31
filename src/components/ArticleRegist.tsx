import axios from "axios";
import { FC, memo } from "react";
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
import { useNavigate } from "react-router-dom";

type FormValues = {
  title: string;
  body: string;
};

export const ArticleRegist: FC = memo(() => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .post("http://127.0.0.1:5000/create", data)
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
        登録画面
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
