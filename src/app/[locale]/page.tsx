import { useTranslations } from 'next-intl';

import { Button } from "@/shared/components/ui/button"
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/components/ui/field';
import { Badge } from '@/shared/components/ui/badge';
import Tests from './components/test';

export default function IndexPage() {
  const t = useTranslations('IndexPage');
  return <div>

    <h1 className='text-red-600'>{t('title')}</h1>
    <Tests/>



  </div>
}


