import { useForm } from "@mantine/form";
import {
  Card,
  Modal,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stepper,
  TextInput,
  Radio,
  Checkbox,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobCard = (props) => {
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
      name: "",
      type: "",
      description: "",
      Company: "",
      location: "",
      salary: "",
      experience: "",
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
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step">
            <TextInput
              label="Name"
              placeholder="Role*"
              {...form.getInputProps("name")}
              required
            />
            <TextInput
              label="Type"
              placeholder="Type*"
              {...form.getInputProps("type")}
              required
            />
            <TextInput
              label="Description"
              placeholder="Description"
              {...form.getInputProps("description")}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step">
            <TextInput
              label="Company"
              placeholder="Company*"
              {...form.getInputProps("company")}
              required
            />
            <TextInput
              type="Number"
              label="Salary"
              placeholder="Salary*"
              {...form.getInputProps("type")}
              required
            />
            <TextInput
              label="Location"
              placeholder="Location"
              {...form.getInputProps("description")}
              required
            />
          </Stepper.Step>
          <Stepper.Step label="Final step">
            <Radio.Group
              name="Remote or In Person"
              label="Select your favorite state of work"
              description=""
              withAsterisk
            >
              <Radio value="true" label="Remote" />
              <Radio value="false" label="Non-Remote" />
            </Radio.Group>
            <Checkbox.Group
              defaultValue={["Softwate Engineer"]}
              label="Select your favorite position"
              description=""
              withAsterisk
            >
              <Checkbox value="Software Engineer" label="Software Engineer" />
              <Checkbox value="Computer Scientist" label="Computer Scientist" />
              <Checkbox value="Frontend Developer" label="Frontend Developer" />
              <Checkbox value="Backend Developer" label="Backend Developer" />
            </Checkbox.Group>
            <TextInput
              type="Number"
              label="Experience"
              placeholder="Experience (in years)"
              {...form.getInputProps("Experience")}
              required
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>{btn}</Button>
        </Group>
      </Modal>
      <Card shadow="sm" radius="md" withBorder>
        <Group ml="xs">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={50}
            width={50}
            alt="Norway"
          />
          <Card>
            <Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
              Company Name
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              Description
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              <FontAwesomeIcon icon="fa-solid fa-users" />
              69 - 420 Employees
            </Text>
          </Card>
        </Group>
        <Group>
          <Badge color="green" variant="light">
            Badge 1
          </Badge>
          <Badge color="green" variant="light">
            Badge 2
          </Badge>
          <Badge color="green" variant="light">
            Badge 3
          </Badge>
        </Group>
        <Group
          position="apart"
          withBorder
          mt="xs"
          style={{
            borderRadius: "4px",
            border: "1px solid #373A40",
            padding: "0.5rem",
          }}
        >
          <Text style={{ maxWidth: 500 }}>
            <span style={{ fontWeight: "500", fontSize: "1.0rem" }}>
              Software Engineer .
            </span>
            <span style={{ fontWeight: "400", fontSize: "0.8rem" }}>
              Hyderabad, Mumbai, Bangalore
            </span>
          </Text>
          <Group>
            <Button variant="outline" color="blue" mt="xs" radius="md">
              Save
            </Button>
            <Button
              variant="light"
              color="blue"
              mt="xs"
              radius="md"
              onClick={() => setOpened(true)}
            >
              Apply
            </Button>
          </Group>
        </Group>
        <Group
          position="apart"
          withBorder
          style={{
            borderRadius: "4px",
            border: "1px solid #373A40",
            padding: "0.5rem",
          }}
        >
          <Text style={{ maxWidth: 500 }}>
            <span style={{ fontWeight: "500", fontSize: "1.0rem" }}>
              Software Engineer .
            </span>
            <span style={{ fontWeight: "400", fontSize: "0.8rem" }}>
              Hyderabad, Mumbai, Bangalore
            </span>
          </Text>
          <Group>
            <Button variant="outline" color="blue" mt="xs" radius="md">
              Save
            </Button>
            <Button
              variant="light"
              color="blue"
              mt="xs"
              radius="md"
              onClick={() => setOpened(true)}
            >
              Apply
            </Button>
          </Group>
        </Group>

        <Group
          position="apart"
          withBorder
          style={{
            borderRadius: "4px",
            border: "1px solid #373A40",
            padding: "0.5rem",
          }}
        >
          <Text style={{ maxWidth: 500 }}>
            <span style={{ fontWeight: "500", fontSize: "1.0rem" }}>
              Software Engineer .
            </span>
            <span style={{ fontWeight: "400", fontSize: "0.8rem" }}>
              Hyderabad, Mumbai, Bangalore
            </span>
          </Text>
          <Group>
            <Button variant="outline" color="blue" mt="xs" radius="md">
              Save
            </Button>
            <Button
              variant="light"
              color="blue"
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
