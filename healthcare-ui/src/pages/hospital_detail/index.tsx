import type { NextPage } from 'next';
import Head from 'next/head';
import { HospitalDetail } from '@/features/hospital_detail/components/HospitalDetail';

const HospitalDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>St. Jude Medical Sanctuary | HealthCare+</title>
        <meta name="description" content="Leading the future of clinical excellence with a patient-first approach" />
      </Head>
      <HospitalDetail />
    </>
  );
};

export default HospitalDetailPage;
