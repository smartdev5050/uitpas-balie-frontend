"use client";

import { Link, Typography } from "@/web/lib/ui";
import { Organizer } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/i18n/client";

type LastCounterDataProps = {
  lastCounter: Organizer;
  handleCounterClick: (organizer: Organizer) => () => void;
};

export const LastCounterData = ({
  lastCounter,
  handleCounterClick,
}: LastCounterDataProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        level="h3"
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.vars.palette.neutral["500"]}`,
          pb: "0.5em",
          mb: "1em",
          textTransform: "uppercase",
          fontSize: "1em",
          fontWeight: 600,
        })}
      >
        {t("counter.lastUsed")}
      </Typography>
      <li style={{ marginBottom: 6 }}>
        <Link onClick={handleCounterClick(lastCounter)}>
          {lastCounter.name}
        </Link>
      </li>
    </>
  );
};
