import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type ContactUsParagraphContent = {
  en: string;
  ja: string;
};

type ContactUsParagraphType = {
  lang: LanguageType;
  content: ContactUsParagraphContent;
  handleGoToContact: () => void;
  num: number;
};
const ContactUsParagraph = ({
  lang,
  content,
  handleGoToContact,
  num,
}: ContactUsParagraphType) => {
  const { t } = useTranslation(lang, "main");

  return (
    <section className='mb-6'>
      <h2 className='text-xl font-semibold mb-1'>
        {num}
        {t("contact.contactUs")}
      </h2>
      <p>
        {lang === "en" ? (
          <>
            If you have any questions about this {content.en}, please{" "}
            <span
              onClick={handleGoToContact}
              className='text-blue-500 underline cursor-pointer'
            >
              contact us
            </span>
            .
          </>
        ) : (
          <>
            この{content.ja}についてのご質問がある場合は、
            <span
              onClick={handleGoToContact}
              className='text-blue-500 underline cursor-pointer'
            >
              こちらから
            </span>
            お問い合わせください。
          </>
        )}
      </p>
    </section>
  );
};

export default ContactUsParagraph;
