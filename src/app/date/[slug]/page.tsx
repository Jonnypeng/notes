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
      fetch(`/xml/${slug}.xml`)
        .then((res) => res.text())
        .then((xmlString) => {
          const parser = new XMLParser();
          const obj = parser.parse(xmlString);

          // 假设结构是 <root><data><item>xxx</item></data></root>
          const items = obj?.root?.data?.item || [];

          // 确保是数组
          const data = Array.isArray(items) ? items : [items];
          setDaily(data);
        })
        .catch((error) => {
          console.error("Error fetching XML:", error);
        });
    }
  }, [slug]);


  return (
    <Container>
      {daily.length === 0 && <div className="flex justify-center items-center">
        <Spin />
      </div>}
      {daily.length > 0 && <div>
        <div className="mb-3 text-center">{slug}</div>
        {
          daily.map((v, i) => (
            <p className="text-base" key={v + i}>{v}</p>
          ))
        }
      </div>}
    </Container>
  )
}