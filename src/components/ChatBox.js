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
} from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { IconSend } from "@tabler/icons";
import { useState } from "react";

const ChatBox = () => {
  const [activeTab, setActiveTab] = useState("chat");

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
        <Container p={0} sx={{ flexGrow: 2 }}>
          <Tabs.Panel value="chat" sx={{ height: "100%", borderRadius: 0 }}>
            <Container p={3} sx={{ height: "100%" }}>
              <Group>
                <Textarea
                  placeholder="Your comment"
                  label="Your comment"
                  withAsterisk
                  sx={{ flexGrow: 1 }}
                />
                <ActionIcon variant="light">
                  <IconSend size={64} />
                </ActionIcon>
              </Group>
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
                ["bold", "italic", "underline", "link", "image"],
                ["unorderedList", "orderedList"],
                ["sup", "sub"],
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
