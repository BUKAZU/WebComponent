import { useLocale } from '../intl';

class MainComponent {
    private t: ReturnType<typeof useLocale>;

    constructor() {
        this.t = useLocale();
    }


    render() {

    }
}

export default MainComponent;

