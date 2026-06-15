import {useTranslations} from 'next-intl';

import { Button } from "@/shared/components/ui/button"

export default function IndexPage(){
  const t = useTranslations('IndexPage');
  return <div>

    <h1 className='text-red-600'>{t('title')}</h1>

  </div>
} 