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
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { addSavedJob, removeSavedJob } from "../store/userReducer";

const JobCard = ({ job, applied, saved, savI, applyI }) => {
  const { user } = useSelector(state => state.auth);
  const { applyJob } = useAuth();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const handleApply = (ev) => {
    setOpened(false);
    applyJob(job._id, form.values.message);
  }
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
          <Button onClick={handleApply}>Submit</Button>
        </Group>
      </Modal>
      <Card shadow="sm" radius="md" withBorder>
        <Group ml="xs">
          <Image
            src={`${job.company.logo}`}
            height={70}
            width={70}
            fit="contain"
            radius={5}
            alt="Norway"
          />
          <Card>
            <Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
              {job.company.name}
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              {job.description}
            </Text>
            <Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
              {job.company.employees} Employees
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
            {
              user.role === "manager" ? null
                : applyI ? null : savI ?
                  <Button variant="outline" mt="xs" radius="md" onClick={() => dispatch(removeSavedJob(job._id))}>Remove</Button>
                  : <Button variant="outline" disabled={saved} mt="xs" radius="md" onClick={() => dispatch(addSavedJob(job))}>{saved ? 'Saved' : 'Save'}</Button>

            }
            {
              user.role !== "manager" ?
                !applyI ?
                  <Button
                    variant="light"
                    mt="xs"
                    radius="md"
                    onClick={() => setOpened(true)}
                    disabled={applied}
                  >
                    {applied ? 'Applied' : 'Apply'}
                  </Button>
                  : null
                : null
            }
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default JobCard;
