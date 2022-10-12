import { utils } from './math-utils';
import { Desk } from './Desk';
import { isPropertySignature } from 'typescript';
import { deskRow } from './interface/deskInterface'

export function DeskRow(props: any) {
    return (
        <div className='GameRow'>
            {utils.range(1, 5).map(deskNumber => (
                <Desk
                    key={deskNumber}
                    row={props.row}
                    deskNum={deskNumber}
                />
            ))}
        </div>
    );
}