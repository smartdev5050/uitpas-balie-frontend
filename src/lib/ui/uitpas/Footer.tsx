import { Box, Divider, Stack, Typography } from "@mui/joy";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const footerLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/UiTnetwerk/?fref=ts",
    icon: faFacebook,
  },
  { label: "Twitter", href: "https://twitter.com/@uitpas/", icon: faTwitter },
  { label: "Website", href: "http://www.uitpas.be/", icon: faExternalLink },
];

const StyledAnchor = styled.a`
  margin: 0 8px;
  color: #2a4b9c;
`;
const StyledLink = styled(Link)`
  margin: 0 8px;
  color: #2a4b9c;
`;
const StyledFooter = styled.footer`
  margin: 36px 16px 16px;
`;

export const Footer = () => {
  const {t} = useTranslation()
  return (
    <StyledFooter>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="flex-end">
          <StyledLink replace href="/feedback">
            {t("footer.submitIssue")}
          </StyledLink>
          <StyledLink replace href="/help">
            {t("footer.help")}
          </StyledLink>
        </Stack>
        <Stack direction="row" alignItems="flex-end">
          {t("footer.follow")}
          {footerLinks.map(({ label, href, icon }) => (
            <StyledAnchor key={label} href={href} target="_blank">
              <Stack direction="row" alignItems="center" gap={0.8}>
                <FontAwesomeIcon icon={icon} fontSize="xs" />
                <Typography level="body2">{label}</Typography>
              </Stack>
            </StyledAnchor>
          ))}
        </Stack>
      </Stack>
      <Divider />
      <Box>
        <Typography level="body3" sx={{ margin: "8px" }}>
          {t("footer.appVersion")} 001{" "}
        </Typography>
      </Box>
    </StyledFooter>
  );
};
