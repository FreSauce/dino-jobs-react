import {
  Container,
  Divider,
  Text,
  Tabs,
  Textarea,
  Button,
  Group,
  UnstyledButton,
  Avatar,
  ActionIcon,
  TextInput,
  Blockquote,
} from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { IconSend } from "@tabler/icons";
import { useState, useRef } from "react";

const chats = [
  {
    name: "Shardul Kurdukar",
    message: "Hello, this is a test message",
  },
  {
    name: "Shardul Kurukar",
    message: "Hello, this is a test message",
  },
  {
    name: "Shardul Kurukre",
    message: "Hello, this is a test message",
  },
  // {
  //   name: "Shardul Kurdukar",
  //   message: "Hello, this is a test message",
  // },
  // {
  //   name: "Shardul Kurdukar",
  //   message: "Hello, this is a test message",
  // },
  // {
  //   name: "Shardul Kurdukar",
  //   message: "Hello, this is a test message",
  // },
  // {
  //   name: "Shardul Kurdukar",
  //   message: "Hello, this is a test message",
  // },
  // {
  //   name: "Shardul Kurdukar",
  //   message: "Hello, this is a test message",
  // },
];

const ChatBox = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const containerRef = useRef();

  return (
    <Container p={0} sx={{ height: "-webkit-fill-available" }} m={0}>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Tabs.List grow>
          <Tabs.Tab color={"teal"} value="chat">
            Chat
          </Tabs.Tab>
          <Tabs.Tab color={"blue"} value="evaluation">
            Evaluation
          </Tabs.Tab>
        </Tabs.List>
        <Container p={0} sx={{ flexGrow: 2 }} m={0} ref={containerRef}>
          <Tabs.Panel value="chat" sx={{ height: "100%", borderRadius: 0 }}>
            <Container
              p={5}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Container
                p={0}
                m={0}
                sx={{ flexDirection: "column", flexGrow: 2 }}
              >
                <Container p={0} m={0}>
                  {console.log(containerRef?.current?.style)}
                  <div
                    style={{
                      display: "block",
                      // height: `${containerRef.current.style.height}`,
                      flex: "1 1 0%",
                      overflowY: "auto",
                    }}
                  >
                    {chats.map((chat) => (
                      <Group key={chat.name}>
                        <Avatar src={chat.name} label={chat.name}>
                          SK
                        </Avatar>
                        <Blockquote sx={{}} cite={`- ${chat.name}`} icon={null}>
                          {chat.message}
                        </Blockquote>
                      </Group>
                    ))}
                  </div>
                </Container>
              </Container>
              <Container
                p={0}
                m={0}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  placeholder="Your comment"
                  sx={{ flexGrow: 1 }}
                  pr={10}
                />
                <ActionIcon variant="transparent" color="violet">
                  <IconSend size={32} />
                </ActionIcon>
              </Container>
            </Container>
          </Tabs.Panel>
          <Tabs.Panel
            value="evaluation"
            sx={{ height: "100%", borderRadius: 0 }}
          >
            <RichTextEditor
              sticky
              sx={{ height: "100%", borderRadius: 0 }}
              controls={[
                ["bold", "italic", "underline", "link"],
                ["unorderedList", "orderedList"],
                ["alignLeft", "alignCenter", "alignRight"],
              ]}
            />
          </Tabs.Panel>
        </Container>
      </Tabs>
    </Container>
  );
};

export default ChatBox;

// https://pattern.monster/japanese-pattern-2/
