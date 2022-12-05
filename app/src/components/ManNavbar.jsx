import { useEffect, useState } from "react";
import { createStyles, Navbar, Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
	IconHome,
	IconUser,
	IconKey,
	IconSettings,
	IconReceipt2,
	IconLogout,
} from "@tabler/icons";
import useAuth from "../hooks/useAuth";
const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef("icon");
	return {
		header: {
			paddingBottom: theme.spacing.md,
			marginBottom: theme.spacing.md * 1.5,
			borderBottom: `1px solid ${theme.colorScheme === "dark"
				? theme.colors.dark[4]
				: theme.colors.gray[2]
				}`,
		},

		footer: {
			paddingTop: theme.spacing.md,
			marginTop: theme.spacing.md,
			borderTop: `1px solid ${theme.colorScheme === "dark"
				? theme.colors.dark[4]
				: theme.colors.gray[2]
				}`,
		},

		link: {
			...theme.fn.focusStyles(),
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			fontSize: theme.fontSizes.sm,
			color:
				theme.colorScheme === "dark"
					? theme.colors.dark[1]
					: theme.colors.gray[7],
			padding: `${theme.spacing.md}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			"&:hover": {
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.gray[0],
				color: theme.colorScheme === "dark" ? theme.white : theme.black,

				[`& .${icon}`]: {
					color: theme.colorScheme === "dark" ? theme.white : theme.black,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color:
				theme.colorScheme === "dark"
					? theme.colors.dark[2]
					: theme.colors.gray[6],
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			"&, &:hover": {
				backgroundColor: theme.fn.variant({
					variant: "light",
					color: theme.primaryColor,
				}).background,
				color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
					.color,
				[`& .${icon}`]: {
					color: theme.fn.variant({
						variant: "light",
						color: theme.primaryColor,
					}).color,
				},
			},
		},
	};
});

const data = [
	{ link: "/", label: "Home", icon: IconHome },
	{ link: "/jobs", label: "Jobs", icon: IconReceipt2 },
	{ link: "/interview", label: "Interview", icon: IconKey },
];

const ManSideBar = () => {
	const location = useLocation();
	const { classes, cx } = useStyles();
	const [active, setActive] = useState();
	const { logout } = useAuth();
	useEffect(() => {
		setActive(location.pathname);
	}, [location]);

	const Logout = () => {
		logout().then(res => {
			console.log(res);
		});
	}
	return (
		<Navbar fixed={true} width={{ sm: 250 }} p="md">
			<Navbar.Section grow>
				<Group className={classes.header} position="apart">
					<h1>Dino Jobs</h1>
				</Group>
				{data.map((item, index) => (
					<Link
						key={item.label}
						className={cx(classes.link, {
							[classes.linkActive]: item.link === active,
						})}
						to={item.link}
					>
						<item.icon className={classes.linkIcon} stroke={1.5} />
						<span>{item.label}</span>
					</Link>
				))}
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<Link
					to={"/profile"}
					className={cx(classes.link, {
						[classes.linkActive]: "/profile" === active,
					})}
				>
					<IconUser className={classes.linkIcon} stroke={1.5} />
					<span>Profile</span>
				</Link>

				<Link to={"/logout"} className={classes.link}>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</Link>
			</Navbar.Section>
		</Navbar>
	);
};

export default ManSideBar;
