"use client";

import { LoginButton } from "@/feature-login/components/LoginButton";
import { Typography } from "@/lib/ui";
import { useTranslation } from "@/lib/i18n/client";

export const CounterNoData = () => {
  const { t } = useTranslation();

  const contactDetails = t("counter.contact", { returnObjects: true }) as {
    name: string;
    email: string;
  }[];

  return (
    <>
      <Typography
        sx={(theme) => ({
          fontStyle: "italic",
          color: theme.vars.palette.neutral[500],
        })}
        gutterBottom
      >
        {t("counter.noCounterP1")}
      </Typography>
      <Typography
        sx={(theme) => ({
          fontStyle: "italic",
          color: theme.vars.palette.neutral[500],
          pb: "1em",
        })}
      >
        {t("counter.noCounterP2")}
      </Typography>

      <ul style={{ marginBottom: "2rem", listStyle: "none", padding: 0 }}>
        {contactDetails.map((contact) => (
          <li key={contact.name}>
            <Typography>
              <strong>{contact.name}</strong>{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
};
