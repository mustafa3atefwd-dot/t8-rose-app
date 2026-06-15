import {useTranslations} from 'next-intl';

import { Button } from "@/shared/components/ui/button"

export default function IndexPage(){
  const t = useTranslations('IndexPage');
  return <div>

    <h1 className='text-red-600'>{t('title')}</h1>
  <div className="flex flex-wrap items-center gap-2 md:flex-row bg-amber-800">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <Button variant="destructive">Secondary</Button>
      </Button>
    </div>
  </div>
} 