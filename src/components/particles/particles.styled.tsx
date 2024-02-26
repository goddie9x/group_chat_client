import styled from '@emotion/styled';
import Particles from 'react-tsparticles';

const TParticlesStyled = styled(Particles)`
    canvas {
        z-index: -1!important;
    }
`;

export default TParticlesStyled;
