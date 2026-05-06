import type { NextPage } from 'next';
import Head from 'next/head';
import { HealthcareServices } from '@/features/healthcare_services/components/HealthcareServices';

const HealthcareServicesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Healthcare Services | HealthCare+</title>
        <meta name="description" content="Explore our curated range of professional medical services" />
      </Head>
      <HealthcareServices />
    </>
  );
};

export default HealthcareServicesPage;
