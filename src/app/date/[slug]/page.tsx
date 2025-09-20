'use client'

import Container from "@/app/components/container";
import { Spin } from "antd";
import { useEffect, useState } from "react";

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
      fetch(`/json/${slug}.json`)
        .then((res) => {
          return res.json();
        })
        .then(resData => {
          setDaily(resData.data)
        })
    }
  }, [slug])


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