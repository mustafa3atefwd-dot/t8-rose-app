import { useTranslations } from 'next-intl';
import Tests from './components/test';



export default function IndexPage(){
  const t = useTranslations();
  return (
    <div>

    <h1 className='text-red-600'>{t('title')}</h1>
    <Tests/>

  </div>
  )
}

