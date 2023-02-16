import ReactBpmn from 'react-bpmn';
import { FunctionComponent } from 'react';

interface Props { }


const ProcessDiagram: FunctionComponent<Props> = () => {
    const onShown = () => {
        console.log('diagram shown');
    };

    const onLoading = () => {
        console.log('diagram loading');
    };

    const onError = (err: Error) => {
        console.log('failed to show diagram');
    };

    return (
        <div>
            <ReactBpmn
                url="diagram.bpmn"
                onShown={onShown}
                onLoading={onLoading}
                onError={onError}
            />
        </div>
    );
};

export default ProcessDiagram;
