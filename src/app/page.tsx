'use client'

import { useState } from "react";
import { Button, DatePicker, Space } from 'antd';
import { useRouter } from "next/navigation";
import Container from "./components/container";

export default function Home() {
  const [date, setDate] = useState<string>();
  const router = useRouter();

  
  return (
    <Container>
      <div>
        <Space>
          <DatePicker
            format={{
              format: 'YYYY-MM-DD',
              type: 'mask',
            }}
            onChange={(_, dateString) => {
              setDate(dateString as string);
            }}
          />
          <Button
            onClick={() => {
              router.push(`/date/${date}`)
            }}
          >
            Submit
          </Button>
        </Space>
      </div>
    </Container>
  );
}
