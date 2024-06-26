// TODO: Build landing page in here

import { i18nConfig } from "@docs-config";
import { useRouter } from "nextra/hooks";
import { Button, ButtonProps } from "./components/Button";
import { ArrowTopRight } from "./components/Icons";
import { Link } from "nextra-theme-docs";

/** Entry point of landing page content */
export function Landing() {
  const divider = (
    <div className="border-y-border-divider border-y-solid border-y-100 w-full h-7" />
  );

  return (
    <div className="landing-page bg-background-primary text-text-primary font-landing">
      <TitleSection />
      {divider}
    </div>
  );
}

function TitleSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  const quickStartButtonProps: ButtonProps = {
    variant: "primary",
    asChild: true,
    children: (
      <Link href={`${locale}/build/quick_start`}>
        Quick Start <ArrowTopRight />
      </Link>
    ),
  };

  const learnButtonProps: ButtonProps = {
    variant: "secondary",
    asChild: true,
    children: (
      <a href="https://learn.aptoslabs.com/">
        Learn <ArrowTopRight />
      </a>
    ),
  };

  return (
    <div
      className="
        flex flex-col items-center px-8 py-16 lg:py-24
        xl:mx-[168px] xl:border-x-border-divider xl:border-x-solid xl:border-x-100
      "
    >
      <div className="flex flex-col items-center gap-8 md:gap-10 lg:gap-12 max-w-[850px]">
        <h1
          className="
            text-center heading-200 sm:display-100 lg:display-200
            max-w-[248px] sm:max-w-[420px] md:max-w-[600px] lg:max-w-none
          "
        >
          {t.headline}
        </h1>
        <p
          className="
            text-center body-300 md:heading-100 text-text-muted
            max-w-[375px] md:max-w-[520px]
          "
        >
          {t.subHeading}
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-[250px] md:w-[unset] md:[&_a]:w-[200px]">
          {/* Unfortunately, there isn't an elegant way to change size variants on breakpoints */}
          <Button size="sm" className="md:hidden" {...quickStartButtonProps} />
          <Button size="sm" className="md:hidden" {...learnButtonProps} />

          <Button
            size="md"
            className="hidden md:flex lg:hidden"
            {...quickStartButtonProps}
          />
          <Button
            size="md"
            className="hidden md:flex lg:hidden"
            {...learnButtonProps}
          />

          <Button
            size="lg"
            className="hidden lg:flex"
            {...quickStartButtonProps}
          />
          <Button size="lg" className="hidden lg:flex" {...learnButtonProps} />
        </div>
      </div>
    </div>
  );
}
