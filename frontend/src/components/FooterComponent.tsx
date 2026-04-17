import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../component.css/FooterStyle.css";

export default function FooterComponent() {
  return (
    <Box
      component="footer"
      className="footer"
      alignItems="center"
      sx={{
        p: 2,
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="#2E2D2D">
              We are E-Mandi.Co, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="#2E2D2D" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="#2E2D2D">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="#2E2D2D"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="#2E2D2D">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="#2E2D2D" href="/">
              E-Mandi.Co
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
