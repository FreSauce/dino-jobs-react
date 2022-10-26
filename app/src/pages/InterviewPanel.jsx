import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Image,
  Stack,
} from "@mantine/core";
import CodeEditor from "../components/CodeEditor";
import { HiUserAdd } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import ChatBox from "../components/ChatBox";
import RichTextEditor from "@mantine/rte";
import useWebRTC from "../hooks/useWebRTC";

const InterviewPanel = () => {
  const [peer, videoRef, chatRef, editorRef] = useWebRTC();

  return (
    <Container sx={{ height: "100vh", backgroundColor: "#202326" }} fluid p={0}>
      <Grid gutter={0}>
        <Grid.Col
          span={6}
          pl={10}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text size={18} color={"white"}>
            Dino-Jobs
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group
            sx={{
              height: "48px",
              textAlign: "center",
              padding: "4px",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="filled" leftIcon={<HiUserAdd />}>
              Invite
            </Button>
            <Button variant="filled" color="red" leftIcon={<FiLogOut />}>
              End Interview
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid gutter={0}>
            <Grid.Col span={5}>
              <CodeEditor initComment={"// Write your code here"} />
            </Grid.Col>
            <Grid.Col span={4}>
              <RichTextEditor
                sx={{
                  height: "100%",
                  backgroundColor: "#1e1e1e",
                  borderRadius: 0,
                }}
                readOnly
                value={"This is the output"}
              />
            </Grid.Col>
            <Grid.Col
              span={3}
              sx={{
                backgroundColor: "#202326",
              }}
            >
              <Stack sx={{ height: "100%" }}>
                <Container p={15}>
                  <Card sx={{ aspectRatio: "calc(16/9)" }}>
                    <Card.Section>
                      <Image
                        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                        alt="Norway"
                      />
                    </Card.Section>
                  </Card>
                </Container>
                <ChatBox />
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default InterviewPanel;
