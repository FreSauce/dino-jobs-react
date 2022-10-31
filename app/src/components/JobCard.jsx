import { useForm } from "@mantine/form";
import {
  Card,
  Modal,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

const JobCard = ({ job, saved, setSavedJobs }) => {
  console.log(saved)
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [active, setActive] = useState(1);
  const [btn, setBtn] = useState("Next Step");
  const nextStep = () => {
    if (btn == "Submit") {
      form.onSubmit((values) => {
        console.log(values);
      });
    }
    if (active == 2) {
      setBtn("Submit");
    }
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  return (
    <>
      <Modal
        centered
        size="xl"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Job Application"
      >
        <Textarea
          label="Message"
          placeholder="Message*"
          {...form.getInputProps("message")}
          required
        />

        <Group position="center" mt="xl">
          <Button onClick={nextStep}>Submit</Button>
        </Group>
      </Modal>
      <Card shadow="sm" radius="md" withBorder>
        <Group ml="xs">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={70}
            width={70}
            radius={5}
            alt="Norway"
          />
          <Card>
            <Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
              {job.company}
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              {job.description}
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              {job.employees} Employees
            </Text>
          </Card>
        </Group>
        <Group>
          {job.req_skills.map((skill, index) => (
            <Badge key={index}>
              {skill}
            </Badge>
          ))}
        </Group>
        <Group
          position="apart" mt="xs"
          style={{
            borderRadius: "4px",

            padding: "0.5rem",
          }}
        >
          <Text style={{ maxWidth: 500 }}>
            <span style={{ fontWeight: "500", fontSize: "1.0rem", marginRight: '20px' }}>
              {job.role}
            </span>
            <span style={{ fontWeight: "400", fontSize: "0.8rem" }}>
              {job.location}
            </span>
            <span style={{ marginLeft: '5px' }}>•</span>
            <span style={{ fontWeight: "400", fontSize: "0.8rem", marginLeft: '10px' }}>
              ${job.salary}
            </span>
          </Text>
          <Group>
            {saved ?
              <Button variant="outline" mt="xs" radius="md" onClick={() => setSavedJobs(prev => prev.filter((j) => j.id !== job.id))}>Remove</Button>
              : <Button variant="outline" mt="xs" radius="md" onClick={() => setSavedJobs(prev => [...prev, job])}>Save</Button>}
            {/* <Button variant="outline" mt="xs" radius="md" onClick={() => setSavedJobs(prev => [...prev, job])}>
              Save
            </Button> */}
            <Button
              variant="light"
              // color={'grape.6'}
              mt="xs"
              radius="md"
              onClick={() => setOpened(true)}
            >
              Apply
            </Button>
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default JobCard;
