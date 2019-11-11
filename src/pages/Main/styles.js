import styled from 'styled-components';

export const Container = styled.div`
    max-width: 780px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0 0.1);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg {
        margin-right: 10px;
        }
    }


`;

export const Form = styled.form`
   margin-top: 30px;
   display: flex;
   flex-direction: row;

   input {
       flex: 1;
       border: 1px solid #eee;
       padding: 10px 15px;
       border-radius: 4px;
       font-size: 16px;
   }
`;

export const SubmnitBtn = styled.button.attrs({
    type: "submit"
})`
   background-color: #7459c1;
   border: 0;
   padding: 0 15px;
   margin-left: 10px;
   border-radius: 4px;

   display: flex;
   justify-content: center;
   align-items: center;


`;