import React, { useEffect }  from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatBar from '../../Tools/StatBar/StatBar';
import Navigation from '../../Tools/Navigation/Navigation';
import DefensiveCoverage from '../Coverage/DefensiveCoverage';
import OffensiveCoverage from '../Coverage/OffensiveCoverage';

import {
    StatsContainer,
    Title,
    SubTitle
} from './StatsStyles';

type pokemonName = string[];

type Props = {
    pkmnName: pokemonName,
    pkmnInfo: any,
    pkmnId: number,
    pkmnImg: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}

const PokemonStats: React.FC<Props> = ({
    pkmnName,
    pkmnInfo,
    pkmnId,
    pkmnImg,
}) =>{
    const [type1, setType1] = React.useState<string>('Electric');
    const [type2, setType2] = React.useState<string>('None');

    const capitalize = ((s: string) => {
        let temp = s[0].toUpperCase() + s.slice(1);
        return temp
    })

    useEffect(() => {
        if(type1 !== capitalize(pkmnInfo.types[0].type.name)){
            setType1(capitalize(pkmnInfo.types[0].type.name));
        }
        if(pkmnInfo.types.length > 1) {
            setType2(capitalize(pkmnInfo.types[1].type.name));
        }
    },[setType1, pkmnInfo.types, type1]);

    return(
        <StatsContainer>
            <Navigation left="/search" right="/search/evolution"/>
            <Row className="align-items-center">
                <Col xs={12} className="mb-5">
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Title>{pkmnName[0]}</Title>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center mt-4">
                        <Col xs={12} sm={12} md={6}>
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <SubTitle className={`${type1}`}>Type 1: {type1}</SubTitle>
                                </Col>
                            </Row>
                            {type2 !== '' &&
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <SubTitle className={`${type2}`}>Type 2: {type2}</SubTitle>
                                </Col>
                            </Row>}
                            <Row className="justify-content-center mt-4">
                                <StatBar name={"HP"} value={parseInt(JSON.stringify(pkmnInfo.stats[0].base_stat))}/>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <StatBar name={"Attack"} value={parseInt(JSON.stringify(pkmnInfo.stats[1].base_stat))}/>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <StatBar name={"Defense"} value={parseInt(JSON.stringify(pkmnInfo.stats[2].base_stat))}/>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <StatBar name={"Sp. Attack"} value={parseInt(JSON.stringify(pkmnInfo.stats[3].base_stat))}/>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <StatBar name={"Sp. Defense"} value={parseInt(JSON.stringify(pkmnInfo.stats[4].base_stat))}/>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <StatBar name={"Speed"}  value={parseInt(JSON.stringify(pkmnInfo.stats[5].base_stat))}/>
                            </Row>
                        </Col>
                        <Col xs="auto" sm={12} md={6}>
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    {pkmnImg}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <DefensiveCoverage type1={type1} type2={type2}/>
            <OffensiveCoverage type1={type1} type2={type2}/>
        </StatsContainer>
    );

}

export default PokemonStats;