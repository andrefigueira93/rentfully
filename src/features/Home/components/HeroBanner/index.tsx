import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type HeroBannerProps = {
  title: string;
  subtitle: string;
  image: string;
} & React.HTMLAttributes<HTMLDivElement>;

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  image,
  children,
  ...rest
}) => {
  return (
    <section id="Hero" className="mt-8">
      <Card
        role="banner"
        className="md:-mx-96 relative bg-cover bg-center bg-no-repeat sm:bg-fixed rounded-xl"
        style={{
          backgroundImage: `url(${image})`,
        }}
        {...rest}
      >
        <div className="h-full w-full opacity-40 bg-black rounded-xl absolute z-0" />
        <CardHeader className="text-center self-center pt-48 ">
          <CardTitle className="text-5xl text-transparent z-10 drop-shadow font-black bg-fixed bg-gradient-to-bl bg-clip-text from-zinc-50 to-cyan-300 tracking-wide">
            {title}
          </CardTitle>
          <CardDescription className="text-2xl text-white z-10">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-32">{children}</CardContent>
      </Card>
    </section>
  );
};

export default HeroBanner;
