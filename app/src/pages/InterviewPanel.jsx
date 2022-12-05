import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Stack,
} from "@mantine/core";
import CodeEditor from "../components/CodeEditor";
import { HiChevronDoubleRight } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import ChatBox from "../components/ChatBox";
import useWebRTC from "../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

const InterviewPanel = () => {
  const interviewId = useParams();
  const [videoRef, chatHandler, editorHandler, compile] = useWebRTC(interviewId);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  }

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
            <Button onClick={compile} variant="filled" leftIcon={<HiChevronDoubleRight />}>
              Run Code
            </Button>
            <Button
              variant="filled"
              color="red"
              leftIcon={<FiLogOut />}
              onClick={handleClick}
            >
              End Interview
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid gutter={0}>
            <Grid.Col span={4}>
              <CodeEditor editorHandler={editorHandler} initComment={"// Write your code here"} />
            </Grid.Col>
            <Grid.Col span={5}>
              <Editor
                height="calc(100vh - 48px)"
                theme="vs-dark"
                value={editorHandler.output}
                readOnly={true}
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
                  <Card sx={{ width: "100%", aspectRatio: "calc(4/3)", padding: "0 !important" }}>
                    <video style={{
                      transform: "scaleX(-1)",
                    }} width={320} height={240} ref={videoRef}></video>
                  </Card>
                </Container>
                <ChatBox chatHandler={chatHandler} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default InterviewPanel;
