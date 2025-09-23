'use client'

import Container from "@/app/components/container";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

export default function Date({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [slug, setSlug] = useState<string>();
  const [daily, setDaily] = useState<string[]>([]);



  useEffect(() => {
    params.then((res) => {
      setSlug(res.slug)
    })
  }, [params])

  useEffect(() => {
    if (slug) {
      fetch(`/datas/${slug}.json`)
        .then((res) => res.json())
        .then((resData) => {
          const items = resData?.root?.data?.item || [];
          const data = Array.isArray(items) ? items : [items];
          setDaily(data);
        })
        .catch((error) => {
          console.error("Error fetching JSON:", error);
        });
    }
  }, [slug]);


  return (
    <Container>
      {daily.length === 0 && <div className="flex justify-center items-center">
        <Spin />
      </div>}
      {daily.length > 0 && <div>
        <div className="mb-3">{slug}</div>
        {
          daily.map((v, i) => (
            <p className="text-base" key={v + i}>{v}</p>
          ))
        }
      </div>}
    </Container>
  )
}