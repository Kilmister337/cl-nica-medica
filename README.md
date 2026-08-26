# MedClin — Sistema de Gestão de Clínica Médica

Projeto de manutenção — **nível desafio**. O mais complexo da sequência: 9 entidades, 11 telas,
regras de negócio de agenda médica, cobertura de convênio e prontuário.

## Tecnologias
- Backend: Java + Spring Boot (porta 8086)
- Banco de dados: PostgreSQL (via Docker, porta 5438)
- Frontend: React + TypeScript + Vite (porta 5178)

## Como rodar

1. **Subir o banco de dados** (dentro desta pasta)
   ```
   docker compose up -d
   ```

2. **Rodar o backend**
   ```
   cd backend
   ./mvnw spring-boot:run
   ```
   No Windows, use `mvnw.cmd spring-boot:run` em vez de `./mvnw spring-boot:run`.

   Não precisa ter o Maven instalado — o `mvnw`/`mvnw.cmd` baixa o Maven sozinho dentro
   da pasta `backend/.mvn` na primeira execução (só precisa de internet e do Java instalado).
   Isso funciona mesmo sem permissão de administrador na máquina.
   As tabelas são criadas automaticamente e populadas com dados de exemplo — especialidades,
   médicos, convênios, pacientes, salas e algumas consultas já marcadas (uma delas propositalmente
   fácil de usar para testar conflito de agenda).

3. **Rodar o frontend** (em outro terminal)
   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Acesse **http://localhost:5178** no navegador.

## As 11 telas

Dashboard, Consultas, Prontuário, Pacientes, Médicos, Especialidades, Convênios, Salas,
Prescrições, Exames e Pagamentos — tudo acessível pelo menu lateral.

## O que fazer

Use o sistema como a recepção, o médico e o financeiro de uma clínica usariam:

- Cadastre uma especialidade, um médico, um convênio, uma sala e um paciente
- Agende uma consulta — e tente agendar **outra** consulta no mesmo médico/sala/horário
- Marque uma consulta como realizada, registre prescrição e exame para ela
- Veja o prontuário de um paciente que já tem histórico
- Registre um pagamento para uma consulta de um paciente com convênio e confira se o valor
  cobrado do paciente faz sentido
- Use o filtro de status na tela de Consultas
- Dê uma olhada nos números do Dashboard e pense se eles realmente batem com o que está
  cadastrado no sistema

Qualquer resultado que não fizer sentido é candidato a chamado. Registre no Painel de Manutenção,
resolva, versione no Git seguindo o guia "Do chamado ao Pull Request", e mova o card para
"Incremento Entregue".

**Dica:** esse projeto tem mais entidades relacionadas entre si do que os anteriores — vale a pena
desenhar num papel como Consulta se conecta com Paciente, Médico, Sala, Prescrição, Exame e
Pagamento antes de sair caçando bug.
