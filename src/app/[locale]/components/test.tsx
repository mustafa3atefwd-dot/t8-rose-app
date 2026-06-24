import { useTranslations } from 'next-intl';

import { Button } from "@/shared/components/ui/button"
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/components/ui/field';
import { Badge } from '@/shared/components/ui/badge';

export default function Tests() {
    const t = useTranslations('IndexPage');
    return <div>

        <h1 className='text-blue-400 text-4xl'>Buttons , checkboxes and Badges </h1>
        {/*Buttons */}
        <div className="flex gap-2">
            <Button className="w-62 h-12">{t('button')}</Button>
            <Button variant="outline" className="w-62 h-12">{t('button')}</Button>
            <Button variant="secondary" className="w-62 h-12">{t('button')}</Button>
            <Button variant="destructive" className="w-62 h-12">{t('button')}</Button>
            <Button className="w-62 h-12" loading loaderLeft>{t('button')}</Button>
            <Button className="w-62 h-12" loading loaderRight variant="outline">
                {t('button')}
            </Button>
        </div>
        {/** Checkbox */}
        <div className="flex gap-2  h-32 p-4 w-full ">
            <FieldSet className="gap-3 w-full" >

                <FieldGroup className="gap-3 w-full">
                    <Field orientation="horizontal">
                        <Checkbox
                            id="finder-pref-9k2-hard-disks-ljj-checkbox"
                            name="finder-pref-9k2-hard-disks-ljj-checkbox"
                            defaultChecked
                        />
                        <FieldLabel
                            htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                            className="font-normal"
                        >
                            Hard disks
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox
                            id="finder-pref-9k2-external-disks-1yg-checkbox"
                            name="finder-pref-9k2-external-disks-1yg-checkbox"
                            defaultChecked
                        />
                        <FieldLabel
                            htmlFor="finder-pref-9k2-external-disks-1yg-checkbox"
                            className="font-normal"
                        >
                            External disks
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox
                            id="finder-pref-9k2-cds-dvds-fzt-checkbox"
                            name="finder-pref-9k2-cds-dvds-fzt-checkbox"
                        />
                        <FieldLabel
                            htmlFor="finder-pref-9k2-cds-dvds-fzt-checkbox"
                            className="font-normal"
                        >
                            CDs, DVDs, and iPods
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox
                            id="finder-pref-9k2-connected-servers-6l2-checkbox"
                            name="finder-pref-9k2-connected-servers-6l2-checkbox"
                        />
                        <FieldLabel
                            htmlFor="finder-pref-9k2-connected-servers-6l2-checkbox"
                            className="font-normal"
                        >
                            Connected servers
                        </FieldLabel>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>

        {/**Badge */}
        <div className="p-4 flex gap-2">
            <Badge>
                {t('badge')}
            </Badge>
            <Badge variant="secondary">
                {t('badge')}
            </Badge>
            <Badge variant="destructive">
                {t('badge')}
            </Badge>
            <Badge variant="outline">
                {t('badge')}
            </Badge>
        </div>



    </div>
}


