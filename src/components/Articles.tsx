import axios from "axios";
import { FC, memo, useEffect, useState } from "react";
import { Box, Divider, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export const Articles: FC = memo(() => {
  const [articles, setArticles] = useState<Array<Article>>([]);

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

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        サンプルブログ
      </Heading>
      <Stack direction="row" spacing={4} mb={4}>
        <Link as={RouterLink} to="/create" color="blue.500">
          新規作成画面
        </Link>
        <Link href="/logout" color="blue.500">
          ログアウト
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
            <Link href="/delete" color="blue.500">
              削除
            </Link>
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
