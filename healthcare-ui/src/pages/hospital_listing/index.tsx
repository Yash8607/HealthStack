import type { NextPage } from 'next';
import Head from 'next/head';
import { HospitalListing } from '@/features/hospital_listing/components/HospitalListing';

const HospitalListingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hospital Recommendations | HealthCare+</title>
        <meta name="description" content="Compare top-tier medical institutions curated for your health profile" />
      </Head>
      <HospitalListing />
    </>
  );
};

export default HospitalListingPage;
