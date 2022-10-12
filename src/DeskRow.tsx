import { utils } from './utils';
import { Desk } from './Desk';
import { isPropertySignature } from 'typescript';
import { deskRow } from './interface/deskInterface'



// generates 5 desks in a row
export function DeskRow(props: any) {
    return (
        <div className='DeskRow'>
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