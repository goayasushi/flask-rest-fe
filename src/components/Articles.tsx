import axios from "axios";
import { FC, memo, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export const Articles: FC = memo(() => {
  const [articles, setArticles] = useState<Array<Article>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://127.0.0.1:5000/${id}/delete`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error deleting the article!", error);
      });
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        サンプルブログ
      </Heading>
      <Stack direction="row" spacing={4} mb={4}>
        <Link as={RouterLink} to="/create" color="blue.500">
          新規作成画面
        </Link>
      </Stack>
      {articles.map((article) => (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          mb={4}
          key={article.id}
        >
          <Heading as="h2" size="md" mb={2}>
            {article.title}
          </Heading>
          <Stack direction="row" spacing={4} mb={2}>
            <Link as={RouterLink} to={`/${article.id}/update`} color="blue.500">
              編集
            </Link>
            <Button
              variant="link"
              color="blue.500"
              fontWeight="normal"
              onClick={() => handleDelete(article.id)}
            >
              削除
            </Button>
          </Stack>
          <Text fontSize="sm" color="gray.500" mb={4}>
            作成日時：{new Date(article.created_at).toLocaleString()}
          </Text>
          <Divider mb={4} />
          <Text fontSize="md">{article.body}</Text>
        </Box>
      ))}
    </Box>
  );
});
