import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Container, Content } from './styles';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox/index';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HIstoryBox';
import BarChartBox from '../../components/BarChartBox';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  /* const options = [
    { value: 'Ana', label: 'Ana' },
    { value: 'Beatriz', label: 'Beatriz' },
    { value: 'Maria', label: 'Maria' }
  ]; */

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      };
    });
  }, []);

  const totalExpense = useMemo(() => {
    let total: number = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('invalid amount! Amount must be number');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('invalid amount! Amount must be number');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpense;
  }, [totalGains, totalExpense]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês você gastou mais do que deveria.',
        footerText:
          'Verifique e tente realizar cortes em gastos desnecessários.',
        icon: sadImg
      };
    } else if (totalGains === 0 && totalExpense === 0) {
      return {
        title: 'Ops!',
        description: 'Neste mês nao há registros de entradas ou de saídas.',
        footerText:
          'Parece que você nao fez nenhum registro no mes selecionado',
        icon: grinningImg
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidado. No proximo mês tente poupar o seu dinheiro',
        icon: grinningImg
      };
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira està positiva',
        footerText: 'Continue assim. COnsidere investir o seu saldo.',
        icon: happyImg
      };
    }
  }, [totalBalance, totalExpense, totalGains]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpense;
    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpense / total) * 100).toFixed(1));

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#E44C4E'
      },
      {
        name: 'Saídas',
        value: totalExpense,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#F7931B'
      }
    ];

    return data;
  }, [totalGains, totalExpense]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error(
                'amountEntry is invalid. amountEntry must be valid'
              );
            }
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error(
                'amountOutput is invalid. amountOutput must be valid'
              );
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substr(0, 3),
          amountEntry,
          amountOutput
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;
    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === 'eventual') {
          return (amountEventual += Number(expense.amount));
        }
      });
    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e'
      }
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;
    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          return (amountRecurrent += Number(gain.amount));
        }
        if (gain.frequency === 'eventual') {
          return (amountEventual += Number(gain.amount));
        }
      });
    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: '#f7931b'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: '#e44c4e'
      }
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24');
    }
  };

  const handleYearSelected = (month: string) => {
    try {
      const parseYear = Number(month);
      setYearSelected(parseYear);
    } catch {
      throw new Error('invalid year value. Is accept 0 - 24');
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#fff">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title="saldo"
          color="#4E41F0"
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          color="#F7931B"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          title="saídas"
          color="#E44C4E"
          amount={totalExpense}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <PieChartBox data={relationExpensesVersusGains} />
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />
        <BarChartBox
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />
        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
