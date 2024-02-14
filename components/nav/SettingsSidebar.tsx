import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ButtonLink from "../utils/ButtonLink";

export const routes = [
  // ["/settings/about", "Account Settings"],
  ["/settings/about", "About"],
  ["/settings/account", "Account"],
  // ["/settings/notifications", "Notifications"],
  // ["/settings/data", "Data"],
  ["/settings/billing", "Billing"],
  // ["/settings/privacy", "Privacy"],
  // ["/settings/help", "Help"],
];

export default function SettingsSidebar() {
  const router = useRouter();
  return (
    <Stack bg="white" p={4} className="settingPageSidebar">
      <Button
        variant="ghost"
        textAlign="left"
        className="removeCss"
        color="#304854"
      >
        Account Settings
      </Button>
      {routes.map(([route, name], i) => (
        <ButtonLink
          textAlign="left"
          key={route}
          href={route}
          bg={
            router.pathname === route &&
            i === routes.map((item) => item[0]).lastIndexOf(route)
              ? "weekly.paleblue"
              : "white"
          }
        >
          {name}
        </ButtonLink>
      ))}
    </Stack>
  );
}
