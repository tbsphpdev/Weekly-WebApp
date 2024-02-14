import { Box } from "@chakra-ui/layout";
import Head from "next/head";
import { useEffect } from "react";

import FeatureHighlights from "../components/landing-page/FeatureHighlights";
import Footer from "../components/landing-page/Footer";
import Hero from "../components/landing-page/Hero";
import Navbar from "../components/auth/Navbar";
import TryNow from "../components/landing-page/TryNow";
import KeyFeatures from "../components/landing-page/KeyFeatures";

export default function LandingPage() {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page-custom");
    return () => {
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("landing-page-custom");
    };
  }, []);

  return (
    <Box>
      <Head>
        <title>Weekly</title>
      </Head>
      {/* isSignup */}
      <Navbar showLogin showSignup />
      <Hero />
      <KeyFeatures />
      <FeatureHighlights />
      <TryNow />
      {/* <Integrations /> */}
      <Footer />
    </Box>
  );
}
