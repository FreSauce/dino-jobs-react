import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group
} from '@mantine/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const JobCard = (props) => {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Group ml="xs" >
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={50}
          width={50}
          alt="Norway"
        />
        <Card>
          <Text sx={{ fontWeight: '600', fontSize: '1rem' }}>Company Name</Text>
          <Text sx={{ fontWeight: '500', fontSize: '0.8rem' }}>Description</Text>
          {/* <Text  sx={{ fontWeight: '500', fontSize: '0.8rem' }}><Fon  tAwesomeIcon icon="fa-solid fa-users" />69 - 420 Employees</Text> */}
        </Card>

      </Group>
      <Group >
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
      <Group position="apart" withBorder mt="xs" style={{ borderRadius: '4px', border: '1px solid #373A40', padding: '0.5rem' }}>
        <Text style={{ "maxWidth": 500 }}>
          <span style={{ fontWeight: '500', fontSize: '1.0rem' }}>
            Software Engineer .
          </span>
          <span style={{ fontWeight: '400', fontSize: '0.8rem' }}>
            Hyderabad, Mumbai, Bangalore
          </span>
        </Text>
        <Group >
          <Button variant="outline" color="blue" mt="xs" radius="md">
            Save
          </Button>
          <Button variant="light" color="blue" mt="xs" radius="md">
            Apply
          </Button>
        </Group>
      </Group>
      <Group position="apart" withBorder style={{ borderRadius: '4px', border: '1px solid #373A40', padding: '0.5rem' }}>
        <Text style={{ "maxWidth": 500 }}>
          <span style={{ fontWeight: '500', fontSize: '1.0rem' }}>
            Software Engineer .
          </span>
          <span style={{ fontWeight: '400', fontSize: '0.8rem' }}>
            Hyderabad, Mumbai, Bangalore
          </span>
        </Text>
        <Group >
          <Button variant="outline" color="blue" mt="xs" radius="md">
            Save
          </Button>
          <Button variant="light" color="blue" mt="xs" radius="md">
            Apply
          </Button>
        </Group>
      </Group>

      <Group position="apart" withBorder style={{ borderRadius: '4px', border: '1px solid #373A40', padding: '0.5rem' }}>
        <Text style={{ "maxWidth": 500 }}>
          <span style={{ fontWeight: '500', fontSize: '1.0rem' }}>
            Software Engineer .
          </span>
          <span style={{ fontWeight: '400', fontSize: '0.8rem' }}>
            Hyderabad, Mumbai, Bangalore
          </span>
        </Text>
        <Group >
          <Button variant="outline" color="blue" mt="xs" radius="md">
            Save
          </Button>
          <Button variant="light" color="blue" mt="xs" radius="md">
            Apply
          </Button>
        </Group>
      </Group>
    </Card>
  )
}

export default JobCard;