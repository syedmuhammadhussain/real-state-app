'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
// export const metadata = {
//   title: 'Вопросы и ответы | KVKEY',
//   description: 'Ответы на часто задаваемые вопросы об аренде, размещении и использовании платформы KVKEY.',
// };
const faqItems = [
  {
    question: 'Как я могу связаться со службой поддержки?',
    answer:
      'Вы можете связаться с нашей службой поддержки по электронной почте support@example.com или через контактную форму на сайте.',
  },
  {
    question: 'Какие города вы поддерживаете?',
    answer:
      'Мы поддерживаем ключевые города России, включая Москву, Санкт-Петербург, Казань и другие.',
  },
  {
    question: 'Как мне разместить свою недвижимость?',
    answer:
      'Зарегистрируйтесь на платформе, нажмите «Добавить недвижимость» и заполните информацию об объекте.',
  },
  {
    question: 'Могу ли я позже отредактировать своё объявление?',
    answer:
      'Да, вы можете редактировать объявление в любое время из вашей личной панели.',
  },
];

export default function FAQ() {
  return (
    <section className="mt-10 max-w-7xl mx-auto px-6 py-16 min-h-screen">
      <div className="flex flex-col items-center text-center mb-10">
        <HelpCircle className="w-14 h-14 text-primary-dark mb-4" />
        <h2 className=" font-bold text-primary-dark ">
          Часто задаваемые вопросы
        </h2>
        <p className=" text-primary-dark text-base md:text-lg">
          Ответы на наиболее распространённые вопросы о платформе.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg text-primary-dark ">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-primary-dark text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
